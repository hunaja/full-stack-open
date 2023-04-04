import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

export interface ContentProps {
    courseParts: CoursePart[];
}

export default function Content({ courseParts }: ContentProps) {
    return (
        <div>
            {courseParts.map((part) => <Part key={part.name} part={part} />)}
        </div>
    );
}
