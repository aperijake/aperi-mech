#include "FieldData.h"

#include <string>
#include <variant>
#include <vector>

#include "Constants.h"
#include "Types.h"

#ifdef USE_PROTEGO_MECH
#include "ProtegoFieldData.h"
#endif

namespace aperi {

size_t FieldDataRankToNumberComponents(FieldDataRank data_rank) {
    if (data_rank == FieldDataRank::SCALAR) {
        return 1;
    }
    if (data_rank == FieldDataRank::VECTOR) {
        return 3;
    }
    if (data_rank == FieldDataRank::TENSOR) {
        return 9;
    }
    throw std::invalid_argument("FieldData: Invalid data type.");
}

}  // namespace aperi
