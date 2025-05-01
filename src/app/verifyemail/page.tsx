"use client";

import axios from "axios";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";


export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    
    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/verifyemail", {token})
            setVerified(true);
        } catch (error: any) { 
            console.error("Error verifying email", error.response?.data?.error || error.message);
            setError(true);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if(token.length>0) {
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-4xl">Verify your Email</h1>
            <hr />
            <h2 className="p-2 bg-orange-400 rounded m-2 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div className="flex flex-col items-center justify-center py-2 font-[family-name:var(--font-geist-sans)]">
                    <h1 className="text-4xl text-green-400">Email verified successfully</h1>
                    <Link href="/login" className="bg-blue-500 mt-4 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
                        Go to Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="rounded m-2 text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    )
}