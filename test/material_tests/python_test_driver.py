from testbook import testbook

@testbook('neohookean.ipynb')
def test_function(tb):
	tb.execute_cell("setup")
	tb.execute_cell("test")

	func = tb.ref("check_results")
	assert func()