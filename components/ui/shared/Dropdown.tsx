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
import { startTransition, useEffect, useState } from "react";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/categoty.actions";

type DropDownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const Dropdown = ({ onChangeHandler, value }: DropDownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  // Function to handle adding a new category
  const handleAddCategory = () => {
    // Create a new category using the provided name
    createCategory({
      categoryName: newCategory.trim(),
    }).then((category) => {
      // Update the categories state with the new category
      setCategories((prevState) => [...prevState, category]);
    });
  };

  // useEffect to fetch and set categories when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch categories
    const getCategories = async () => {
      // Call the getAllCategories function to retrieve the list of categories
      const categoriesList = await getAllCategories();
      // If categoriesList is not null or undefined, set the categories state
      categoriesList && setCategories(categoriesList as ICategory[]);
    };

    // Call the getCategories function when the component mounts
    getCategories();
  }, []); // Empty dependency array means this useEffect runs only once when the component mounts

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
                value={category._id}
                className="text-sm"
              >
                {category.name}
              </SelectItem>
            ))}
          <AlertDialog>
            <AlertDialogTrigger className="p-regular-16 py-5 w-full text-start px-8 capitalize hover:text-primary-500">
              add new category
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="text"
                    placeholder="Add Category"
                    className="input-field"
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => startTransition(handleAddCategory)}
                >
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    </div>
  );
};
export default Dropdown;
