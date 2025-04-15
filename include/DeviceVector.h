#pragma once

#include <Kokkos_Core.hpp>
#include <cstdint>

namespace aperi {

/**
 * @brief A simple device vector class that mimics std::vector.
 * @tparam T The type of the elements in the vector.
 */
template <typename T>
struct DeviceVector {
    Kokkos::View<T*> m_data;                        // The data of the vector
    Kokkos::View<size_t*> m_size_device;            // The size of the vector on the device
    size_t m_capacity_host;                         // The capacity of the vector
    Kokkos::View<size_t*>::HostMirror m_size_host;  // The size of the vector on the host

    /**
     * @brief Constructs a DeviceVector with the given capacity.
     * @param capacity The initial capacity of the vector.
     */
    DeviceVector(size_t capacity) : m_data("data", capacity), m_size_device("size_device", 1), m_capacity_host(capacity) {
        m_size_host = Kokkos::create_mirror_view(m_size_device);
        m_size_host(0) = 0;
        Kokkos::deep_copy(m_size_device, m_size_host);
    }

    /**
     * @brief Destructor for the DeviceVector.
     */
    ~DeviceVector() {
        // No need to manually free memory, Kokkos handles it
    }

    /**
     * @brief Copy constructor for the DeviceVector.
     * @param other The DeviceVector to copy from.
     */
    DeviceVector(const DeviceVector& other) : m_data("data_copy", other.m_capacity_host),
                                              m_size_device("size_device_copy", 1),
                                              m_capacity_host(other.m_capacity_host) {
        m_size_host = Kokkos::create_mirror_view(m_size_device);

        // Copy size values
        Kokkos::deep_copy(m_size_host, other.m_size_host);
        Kokkos::deep_copy(m_size_device, other.m_size_device);

        // Copy actual data
        Kokkos::deep_copy(m_data, other.m_data);
    }

    /**
     * @brief Move constructor for the DeviceVector.
     * @param other The DeviceVector to move from.
     */
    DeviceVector(DeviceVector&& other) noexcept : m_data(std::move(other.m_data)),
                                                  m_size_device(std::move(other.m_size_device)),
                                                  m_capacity_host(other.m_capacity_host),
                                                  m_size_host(std::move(other.m_size_host)) {
        // Create host mirror
        other.m_capacity_host = 0;
        other.m_size_device = Kokkos::View<size_t*>("empty_size_device", 1);
        other.m_size_host = Kokkos::create_mirror_view(other.m_size_device);
        other.m_size_host(0) = 0;
        Kokkos::deep_copy(other.m_size_device, other.m_size_host);
        other.m_data = Kokkos::View<T*>("empty_data", 0);
    }

    /**
     * @brief Clear the vector.
     * @note This function resets the size of the vector to 0.
     */
    void Clear() {
        m_size_host(0) = 0;
        Kokkos::deep_copy(m_size_device, m_size_host);
    }

    struct PushBackFunctor {
        Kokkos::View<T*> m_data;              // The data of the vector
        Kokkos::View<size_t*> m_size_device;  // The size of the vector on the device

        PushBackFunctor(Kokkos::View<T*> data, Kokkos::View<size_t*> size_device) : m_data(data), m_size_device(size_device) {}

        KOKKOS_INLINE_FUNCTION
        void operator()(const T& value) const {
            size_t idx = Kokkos::atomic_fetch_add(&m_size_device(0), 1);
            if (idx >= m_data.extent(0)) {
                Kokkos::abort("DeviceVector capacity exceeded");
            } else {
                m_data(idx) = value;
            }
        }
    };

    /**
     * @brief A functor for pushing back a value into the vector.
     */
    PushBackFunctor GetPushBackFunctor() {
        return PushBackFunctor(m_data, m_size_device);
    }

    /**
     * @brief Gets the size of the vector.
     * @return The size of the vector.
     */
    KOKKOS_INLINE_FUNCTION
    size_t Size() const {
        return m_size_device(0);
    }

    /**
     * @brief Gets the size of the vector. Host version.
     * @return The size of the vector.
     */
    size_t SizeHost() const {
        // Copy size from device to host
        Kokkos::deep_copy(m_size_host, m_size_device);
        return m_size_host(0);
    }

    /**
     * @brief Gets the capacity of the vector.
     * @return The capacity of the vector.
     */
    KOKKOS_INLINE_FUNCTION
    size_t Capacity() const {
        return m_data.extent(0);
    }

    /**
     * @brief Gets the capacity of the vector. Host version.
     * @return The capacity of the vector.
     */
    size_t CapacityHost() const {
        return m_capacity_host;
    }

    /**
     * @brief Gets the data of the vector at the given index.
     * @return The data of the vector.
     */
    KOKKOS_INLINE_FUNCTION
    T& operator()(size_t index) {
        KOKKOS_ASSERT(index < m_size_device(0));
        return m_data(index);
    }

    /**
     * @brief Gets the data of the vector at the given index.
     * @return The data of the vector.
     */
    KOKKOS_INLINE_FUNCTION
    const T& operator()(size_t index) const {
        KOKKOS_ASSERT(index < m_size_device(0));
        return m_data(index);
    }

    /**
     * @brief Get the data of the vector on the host.
     * @return The data of the vector.
     */
    typename Kokkos::View<T*>::HostMirror GetDataHost() const {
        typename Kokkos::View<T*>::HostMirror data_host = Kokkos::create_mirror_view(m_data);
        Kokkos::deep_copy(data_host, m_data);
        return data_host;
    }
};

}  // namespace aperi
