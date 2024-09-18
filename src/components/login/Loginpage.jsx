import React from "react";
import Button from '@mui/material/Button';

const Loginpage = () => {
    return (
        <section className="bg-gray-100 min-h-screen flex items-center justify-center" >
            <div className="bg-cyan-100 flex rounded-2xl max-w-3xl">
                {/* form */}
                <div class="w-1/2">
                    <h2 class = "font-bold text-2xl">test</h2>
                    <p class = "text-sm mt-4">If you already a member, easily log in</p>

                    <form class= "flex flex-col gap-4">
                        <input type="text" placeholder="Email" class="border border-gray-400 p-2 rounded-lg" />
                        <input type="password" placeholder="Password" class="border border-gray-400 p-2 rounded-lg" />
                        <Button variant="contained">Login</Button>
                    </form>
                </div>
                {/* picture */}
                
            </div>
        </section>
    );  
};

export default Loginpage;