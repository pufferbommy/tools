import { Moon, Sun } from "lucide-react";

import { useTheme } from "./providers/theme-provider";
import { Button } from "./ui/button";

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<Button onClick={toggleTheme} variant="ghost" size="icon">
			<Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">สลับธีม</span>
		</Button>
	);
}
