import React from 'react';
import EmployeeCard from '../employeeCard/EmployeeCard';

const styles = {
  horizontal: 'hor',
  vertical: 'vert',
};

const EmployeeContainer = ({ employeeCards, style }) => {
  console.log(employeeCards);
  return (
    <>
      {style === 'horizontal' && (
        <hr
          className={`home__${styles[style]}Line`}
          style={{ width: `${employeeCards.length * 35 - 15}rem` }}
        />
      )}

      <div className={`${styles[style]} `}>
        {style === 'vertical' && (
          <hr
            className={`home__${styles[style]}Line`}
            style={{ height: `${employeeCards.length * 35 - 35}rem` }}
          />
        )}
        <ul className={`${styles[style]}`}>
          {employeeCards.map(
            ({
              employee_name,
              business_title,
              region,
              profile_pic,
              subordinates,
              department,
            }) => {
              return (
                <li key={employee_name}>
                  <EmployeeCard
                    name={employee_name}
                    role={business_title}
                    locationText={region}
                    profileImage={profile_pic}
                    department={department}
                    subordinates={subordinates}
                  />
                </li>
              );
            }
          )}
        </ul>
      </div>
    </>
  );
};

export default EmployeeContainer;
