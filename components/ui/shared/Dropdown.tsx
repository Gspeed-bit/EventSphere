"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { ICategory } from "@/lib/database/models/categoty.model";
import { startTransition, useState } from "react";

type DropDownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({ onChangeHandler, value }: DropDownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
const [newCategory, setNewCategory] = useState("");

const handleAddCategory=()=>{

}

  return (
    <div>
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field ">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.length > 0 &&
            categories.map((category) => (
              <SelectItem
                key={category._id}
                value={category.name}
                className="text-sm"
              >
                {category.name}
              </SelectItem>
            ))}
          <AlertDialog>
            <AlertDialogTrigger className="p-regular-16 py-5 w-full text-start px-8 hover:text-primary-500">
              Open
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input type="text" placeholder="Add Category" className="input-field" onChange={(e)=>setNewCategory(e.target.value)} />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=> startTransition(handleAddCategory) }>Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    </div>
  );
};
export default Dropdown;
