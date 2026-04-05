import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const SignUp = () => {
    const { apiUrl, setAuth } = useAuth();
    const googleUrl = `${apiUrl}/api/auth/google`;
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setFormValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (formValues.password !== formValues.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formValues.name,
                    email: formValues.email,
                    password: formValues.password,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            setAuth({ token: data.token, user: data.user });
            navigate("/account");
        } catch (err) {
            setError(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="px-6 lg:px-12 py-12">
                <div className="max-w-3xl mx-auto">
                        {/* Page Title */}
                        <h1 className="text-4xl md:text-5xl font-serif mb-8">Signup</h1>

                        {/* Signup Form */}
                        <form className="space-y-6 flex flex-col" onSubmit={handleSubmit}> 
                            <Input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="bg-transparent border-border rounded-none py-6"
                                value={formValues.name}
                                onChange={handleChange}
                            />

                            <Input 
                                type="email"
                                name="email"
                                placeholder="Email *"
                                required
                                className="bg-transparent border-border rounded-none py-6"
                                value={formValues.email}
                                onChange={handleChange}
                            />

                            <Input
                                type="password"
                                name="password"
                                placeholder="Password *"
                                required
                                className="bg-transparent border-border rounded-none py-6"
                                value={formValues.password}
                                onChange={handleChange}
                            />

                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                required
                                className="bg-transparent border-border rounded-none py-6"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                            />

                            <Button    
                                type="submit"
                                disabled={loading}
                                className="bg-primary text-primary-foreground px-12 py-6 hover:bg-primary/90 w-min h-1 flex items-center justify-center">
                                    {loading ? "Creating..." : "Signup"}
                            </Button>
                        </form>
                        {error && (
                            <p className="mt-4 text-sm text-destructive">{error}</p>
                        )}
                        <div className="mt-4">
                            <Button
                                variant="outline"
                                className="w-full py-6"
                                asChild
                            >
                                <a href={googleUrl}>Continue with Google</a>
                            </Button>
                        </div>
                        <div className="my-3 flex gap-1">
                            <p >Sign in to already existing account.</p>
                            <div>
                                <Link to="/login" className="text-primary hover:underline">
                                    Login<span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                        
                            
                         
                </div>
            </div>
        </Layout>
    );

};

export default SignUp;