export {}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface DescribedCoursePartBase extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends DescribedCoursePartBase {
    kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
}

interface CoursePartBackground extends DescribedCoursePartBase {
    backgroundMaterial: string;
    kind: "background";
}

interface CoursePartSpecial extends DescribedCoursePartBase {
    requirements: string[];
    kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
