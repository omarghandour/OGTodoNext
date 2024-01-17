"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addTodos, editTodo, getTodos } from "@/app/actions/Todos";
import Header from "./Header";
import { useFormStatus } from "react-dom";
import Tasks from "./Tasks";
import { Call2 } from "@/app/actions/Calls";
const client = async (FormData: FormData) => {
  Call2(FormData);
};

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <Button className=" w-full" disabled={pending}>
      {pending ? "Adding " : "Add"}
    </Button>
  );
};

const DialogDemo = () => {
  return (
    <div className=" flex mt-2">
      <div className=" m-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Task</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form action={client}>
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
              {/* <DialogFooter> */}
              <Submit />
              {/* </DialogFooter> */}
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* editt  */}
    </div>
  );
};
// fetch data
const fetchTodos = async () => {
  const { data } = await getTodos();
  console.log(data);
};

const Home = (data: any) => {
  const tasks = data?.data.map((task: any) => {
    return task;
  });

  return (
    <div className="">
      <Header />

      <DialogDemo />
      <Tasks task={tasks} user={true} />
    </div>
  );
};

export default Home;
