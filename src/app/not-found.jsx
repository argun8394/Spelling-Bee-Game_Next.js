import Link from "next/link";
import React from "react";

const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-10">
            <h2 className="font-[700] text-2xl">Not Found</h2>
            <p className="font-[500] text-xl">Sorry, the page you are lookingfor does not exist.</p>
            <Link href="/" className="underline">Return Home</Link>
        </div>
    );
};

export default NotFound;