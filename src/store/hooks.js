import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

