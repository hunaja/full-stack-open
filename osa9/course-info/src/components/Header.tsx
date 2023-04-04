import React from 'react';

export interface HeaderProps {
    name: string;
}

export default function Header({ name }: HeaderProps) {
    return (
        <h1>{name}</h1>
    );
}
