import React from "react";

const Tasks = ({ task }: any) => {
  return (
    <div className=" w-2/5 bg-white">
      {task?.map((task: any) => {
        return <div key={task.id}>{task.title}</div>;
      })}
    </div>
  );
};

export default Tasks;
