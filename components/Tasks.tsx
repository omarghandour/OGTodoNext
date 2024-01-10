import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Tasks = ({ task }: any) => {
  return (
    <div>
      <div className=" w-2/5"></div>
      <Table className=" w-3/4">
        <TableCaption>A list of your recent invoices.</TableCaption>

        <TableBody>
          {task?.map((task: any) => {
            return (
              <TableRow key={task.id}>
                <TableCell className="font-medium w-1/2">
                  {task.title}
                </TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tasks;
