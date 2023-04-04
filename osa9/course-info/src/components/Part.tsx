import React from "react";
import { CoursePart } from "../types";
import assertNever from "../utils/assertNever";

export interface PartProps {
    part: CoursePart;
}

function PartExtra({ part }: PartProps) {
    switch (part.kind) {
        case "background":
            return (
                <>
                    <i>{part.description}</i>
                    <br />
                    submit to {part.backgroundMaterial}
                </>
            );
        case "basic":
            return (
                <>
                    <i>{part.description}</i>
                </>
            );
        case "group":
            return (
                <>
                    project exercises {part.groupProjectCount}
                </>
            );
        case "special":
            return (
                <>
                    <i>{part.description}</i>
                    <br />
                    required skills: {part.requirements.join(", ")}
                </>
            )
        default:
            return assertNever(part);
        }
}

export default function Part({ part }: PartProps) {
    return (
        <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br />
            <PartExtra part={part} />
        </p>
    )
}
