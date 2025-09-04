import React, { Component } from 'react';
import { variables } from './Variables.js';
import Loader from './Loader.js';

export class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            modalTitle: "",
            DepartmentName: "",
            DepartmentId: 0,

            DepartmentIdFilter: "",
            DepartmentNameFilter: "",
            departmentsWithoutFilter: [],
            isLoading: true
        }
        this.loaderTimeout = null;
    }
    FilterFn() {
        var DepartmentIdFilter = this.state.DepartmentIdFilter;
        var DepartmentNameFilter = this.state.DepartmentNameFilter;

        var filteredData = this.state.departmentsWithoutFilter.filter(
            function (el) {
                return el.DepartmentId.toString().toLowerCase().includes(
                    DepartmentIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.DepartmentName.toString().toLowerCase().includes(
                        DepartmentNameFilter.toString().trim().toLowerCase()
                    )
            }
        );
        this.setState({ departments: filteredData });
    }
    sortResult(prop, asc) {
        var sortedData = this.state.departmentsWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        this.setState({ departments: sortedData });
    }

    changeDepartmentIdFilter = (e) => {
        this.state.DepartmentIdFilter = e.target.value;
        this.FilterFn();
    }
    changeDepartmentNameFilter = (e) => {
        this.state.DepartmentNameFilter = e.target.value;
        this.FilterFn();
    }

    // refreshList() {
    //     this.setState({ isLoading: true });
    //     fetch(variables.API_URL + 'department/getDepartment')
    //         .then(response => response.json())
    //         .then(data => {
    //             this.setState({ departments: data, departmentsWithoutFilter: data, isLoading: false });
    //         });
    // }

    refreshList() {
        this.setState({ isLoading: true });

        // Start both fetch and timer
         const fetchPromise = fetch(variables.API_URL + 'department/getDepartment')
        //const fetchPromise = fetch(variables.API_URL + 'DepartmentNew')
            .then(response => response.json());

        const minDuration = new Promise(resolve => {
            this.loaderTimeout = setTimeout(resolve, 1500); // 1.5 seconds
        });

        Promise.all([fetchPromise, minDuration]).then(([data]) => {
            this.setState({
                departments: data,
                departmentsWithoutFilter: data,
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentWillUnmount() {
        // Clear timeout if component unmounts early
        if (this.loaderTimeout) clearTimeout(this.loaderTimeout);
    }

    changeDepartmentName = (e) => {
        this.setState({ DepartmentName: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Department",
            DepartmentId: 0,
            DepartmentName: ""
        });
    }
    editClick(dep) {
        this.setState({
            modalTitle: "Edit Department",
            DepartmentId: dep.DepartmentId,
            DepartmentName: dep.DepartmentName
        });
    }

    createClick() {
        if (!this.state.DepartmentName.trim()) {
            alert("Please enter a department name");
            return;
        }
        fetch(variables.API_URL + 'department/adddepartment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartmentName: this.state.DepartmentName
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }
    updateClick() {
        fetch(variables.API_URL + 'department/updatedepartment', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartmentId: this.state.DepartmentId,
                DepartmentName: this.state.DepartmentName
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }
    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + 'department/DeleteDepartment?id=' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    render() {
        const {
            departments,
            modalTitle,
            DepartmentId,
            DepartmentName,
            isLoading
        } = this.state;

        return (
            <div style={{ minHeight: 400, position: 'relative' }}>
                {isLoading ? (
                    // <div className="flex justify-center items-center h-full">
                    //     <span>Loading...</span>
                    // </div>
                    <Loader />
                ) : (
                    <>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Department
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">

                                    <input className="form-control m-2"
                                        onChange={this.changeDepartmentIdFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('DepartmentId', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('DepartmentId', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>

                                </div>
                                Department Id
                            </th>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2"
                                        onChange={this.changeDepartmentNameFilter}
                                        placeholder="Filter" />

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('DepartmentName', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light"
                                        onClick={() => this.sortResult('DepartmentName', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                    </button>
                                </div>
                                Department Name

                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(dep =>
                            <tr key={dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(dep)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(dep.DepartmentId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Department Name</span>
                                    <input type="text" className="form-control"
                                        value={DepartmentName}
                                        onChange={this.changeDepartmentName} />
                                </div>

                                {DepartmentId === 0 ?
                                    <button type="button"
                                        data-bs-dismiss="modal"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}
                                    >Create</button>
                                    : null}

                                {DepartmentId !== 0 ?
                                    <button type="button"
                                        data-bs-dismiss="modal"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}
                                    >Update</button>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
                </>
                )}
            </div>
        )
    }
}

// const DepartmentComponent = () => {
//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
//         <h2 className="text-3xl font-bold text-gray-900">Department Management</h2>
//         <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-lg hover:shadow-xl">
//           <Plus className="h-5 w-5" />
//           <span>Add Department</span>
//         </button>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {mockDepartments.map((dept) => (
//           <div key={dept.id} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition-all hover:scale-105">
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <h3 className="text-2xl font-semibold text-gray-900">{dept.name}</h3>
//                 <p className="text-gray-600 mt-1">Manager: {dept.manager}</p>
//               </div>
//               <div className="flex space-x-2">
//                 <button className="text-blue-600 hover:text-blue-900 hover:scale-110 transition-all">
//                   <Edit className="h-5 w-5" />
//                 </button>
//                 <button className="text-red-600 hover:text-red-900 hover:scale-110 transition-all">
//                   <Trash2 className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
//                 <div className="flex items-center space-x-2 mb-2">
//                   <Users className="h-6 w-6 text-blue-500" />
//                   <span className="text-sm font-medium text-gray-600">Employees</span>
//                 </div>
//                 <p className="text-2xl font-bold text-gray-900">{dept.employees}</p>
//               </div>
              
//               <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
//                 <div className="flex items-center space-x-2 mb-2">
//                   <MapPin className="h-6 w-6 text-green-500" />
//                   <span className="text-sm font-medium text-gray-600">Budget</span>
//                 </div>
//                 <p className="text-2xl font-bold text-gray-900">{dept.budget}</p>
//               </div>
//             </div>
            
//             <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 rounded-lg transition-colors font-medium">
//               View Details
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };