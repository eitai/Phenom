import React, { useState, useEffect, useMemo, useCallback } from 'react';
import EmployeeContainer from '../employeeContainer/EmployeeContainer';
import EmployeeCard from '../employeeCard/EmployeeCard';

import './home.scss';

const Home = ({ employees }) => {
  const [employeesArr, setEmployeesArr] = useState([]);
  const [filteredSubs, setFilterSubs] = useState([]);

  const flattenEmployees = (elements) => {
    elements.subordinates?.map((employee) => {
      setEmployeesArr((oldArr) => [...oldArr, employee]);
      return flattenEmployees(employee);
    });
  };

  const employeeFilter = (Callback) => (personChoosed) => {
    const filteredArr = employeesArr.filter((el) => {
      return personChoosed.toLowerCase() === el.manager.toLowerCase();
    });
    console.log(filteredArr);
    setFilterSubs(filteredArr);
  };

  useEffect(() => {}, []);

  const flatJson = useMemo(() => flattenEmployees(employees), [employees]);

  return (
    <div className='home'>
      <ul className='home__node-main'>
        <li>
          <EmployeeCard
            name={employees.employee_name}
            locationText={employees.region}
            role={employees.business_title}
            profileImage={employees.profile_pic}
          />
        </li>
        <hr
          className='home__horLine'
          style={{ width: `${employees.subordinates.length * 35 - 35}rem` }}
        />
        <ul className='home__node-child'>
          <div className='layer'>
            {employees.subordinates.map((employee, index) => {
              return (
                <li
                  className='home__node-item'
                  key={employee.employee_name}
                  onClick={() => employeeFilter(employee.employee_name)}
                >
                  <div
                  // onClick={() =>
                  //   managerClicked(employee?.subordinates, index)
                  // }
                  >
                    <EmployeeCard
                      name={employee.employee_name}
                      locationText={employee.region}
                      role={employee.business_title}
                      profileImage={employee.profile_pic}
                      department={employee.department}
                    />
                  </div>

                  {!filteredSubs.length > 0 && (
                    <EmployeeContainer
                      employeeCards={employee.subordinates}
                      style='vertical'
                    />
                  )}
                </li>
              );
            })}
            <div>
              {filteredSubs.length > 0 && (
                <EmployeeContainer
                  employeeCards={filteredSubs[0]}
                  style='horizontal'
                />
              )}
            </div>
          </div>
        </ul>
      </ul>
    </div>
  );
};

export default Home;
