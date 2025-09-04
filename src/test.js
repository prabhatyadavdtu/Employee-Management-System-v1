// Add this before the closing div of the table section
const PaginationControls = () => (
  <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div className="flex flex-1 justify-between sm:hidden">
      <button
        onClick={() => handlePageChange(pagination.page - 1)}
        disabled={!pagination.hasPreviousPage}
        className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
          !pagination.hasPreviousPage 
            ? 'text-gray-300' 
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        Previous
      </button>
      <button
        onClick={() => handlePageChange(pagination.page + 1)}
        disabled={!pagination.hasNextPage}
        className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
          !pagination.hasNextPage 
            ? 'text-gray-300' 
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        Next
      </button>
    </div>
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{((pagination.page - 1) * pagination.pageSize) + 1}</span> to{' '}
          <span className="font-medium">
            {Math.min(pagination.page * pagination.pageSize, pagination.totalCount)}
          </span>{' '}
          of <span className="font-medium">{pagination.totalCount}</span> results
        </p>
      </div>
      <div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                pageNumber === pagination.page
                  ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                  : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </nav>
      </div>
    </div>
  </div>
);

// Add the pagination handler
const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= pagination.totalPages) {
    setPagination(prev => ({ ...prev, page: newPage }));
    fetchEmployees();
  }
};

// Add PaginationControls component after the table
{!isLoading && filteredEmployees.length > 0 && <PaginationControls />}


async getAllEmployees(page = 1, pageSize = 10) {
  const response = await this.authenticatedRequest(
    `${this.baseURL}/employee?page=${page}&pageSize=${pageSize}`,
    {
      method: 'GET'
    }
  );
  console.log("Response from getAllEmployees:", response);
  return {
    items: Array.isArray(response.items) ? response.items : [],
    totalCount: response.totalCount,
    page: response.page,
    pageSize: response.pageSize,
    totalPages: response.totalPages,
    hasNextPage: response.hasNextPage,
    hasPreviousPage: response.hasPreviousPage
  };
}