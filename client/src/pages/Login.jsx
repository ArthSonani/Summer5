import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
    const { apiUrl, setAuth, fetchMe } = useAuth();
    const googleUrl = `${apiUrl}/api/auth/google`;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = searchParams.get("token");
        if (!token) return;

        setAuth({ token, user: null });
        fetchMe(token)
            .then(() => navigate("/account", { replace: true }))
            .catch(() => setError("Google sign-in failed. Please try again."));
    }, [searchParams, setAuth, fetchMe, navigate]);

    const handleChange = (event) => {
        setFormValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            setAuth({ token: data.token, user: data.user });
            navigate("/account");
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
       <Layout>
        <div className="px-6 lg:px-12 py-12">
         <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif mb-8">
                Login
            </h1>

            <form className="space-y-6 flex flex-col" onSubmit={handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    className="bg-transparent border-border rounded-none py-6" 
                    value={formValues.email}
                    onChange={handleChange}
                    required
               />
            
                <Input  
                    type="password"
                    name="password"
                    placeholder="Password *"
                    className="bg-transparent border-border rounded-none py-6"
                    value={formValues.password}
                    onChange={handleChange}
                    required
                />
            
                <Button    
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-primary-foreground px-12 py-6 hover:bg-primary/90 w-min h-1 flex items-center justify-center">
                    {loading ? "Signing in..." : "Login"}
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
                <p >Don't have an account.</p>
                <div>
                    <Link to="/signup" className="text-primary hover:underline ">
                        Register<span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
         </div>
        </div>
       </Layout>
    )
}

export default Login;