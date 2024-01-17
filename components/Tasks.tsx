"use client";
import React, { useTransition } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { editTodo } from "@/app/actions/Todos";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { useFormStatus } from "react-dom";
import { Call1, Call3 } from "@/app/actions/Calls";
import { Progress } from "@/components/ui/progress";

const Tasks = ({ task }: any, user: boolean) => {
  const Edit = () => {
    const { pending } = useFormStatus();
    return (
      <Button className=" w-full" disabled={pending}>
        {pending ? "Editing " : "Edit"}
      </Button>
    );
  };
  const Delete = () => {
    const { pending } = useFormStatus();
    return (
      <Button className="w-full md:w-1/4" disabled={pending}>
        {pending ? "Deleting " : "X"}
      </Button>
    );
  };
  const EditUI = async (taskID: any) => {
    const handleCLick = async (FormData: FormData) => {
      Call1(FormData, taskID.taskID);
    };

    return (
      <div className=" m-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form action={handleCLick}>
              <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
                <DialogDescription>Add your task and process</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Task
                  </Label>
                  <Input
                    name="name"
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <>
                  <Slider
                    name="process"
                    defaultValue={[33]}
                    max={100}
                    step={1}
                  />
                </>
              </div>
              <DialogFooter>
                <Edit />
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
  return (
    <div>
      <div className=" w-2/5"></div>
      <Table className=" w-full md:w-3/4 p-5">
        <TableCaption>A list of your recent invoices.</TableCaption>

        <TableBody>
          {task?.map((task: any) => {
            return (
              <TableRow key={task.id} className="flex flex-col md:flex-row p-5">
                <TableCell
                  className={`font-medium w-1/2 ${
                    task.progress === 100 ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </TableCell>
                <TableCell className=" w-full md:w-1/4">
                  <Progress value={task.progress} />
                </TableCell>
                {user ? (
                  <>
                    <TableCell className="text-center p-0 ">
                      <EditUI taskID={task.id} />
                    </TableCell>
                    <TableCell className="p-0" onClick={() => Call3(task.id)}>
                      <Delete />
                    </TableCell>
                  </>
                ) : null}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tasks;
