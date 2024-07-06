"use client";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useState } from "react";


function ThemeToggle() {
    const themes = {
        winter: "winter",
        dracula: "dracula"
    }

    const[theme, setTheme]=useState(themes.winter);

    function toggleTheme() {
        const newTheme= theme === themes.winter ? themes.dracula : themes.winter;
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    }

  return <button className="btn btn-primary btn-sm btn-outline" onClick={()=> toggleTheme()}>
  {theme ==="winter" ? <BsMoonFill className="w-4 h-4"></BsMoonFill>
   : <BsSunFill className="w-4 h-4"></BsSunFill>}</button>;
}

export default ThemeToggle;
