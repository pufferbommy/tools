import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./providers/ThemeProvider";
import { Button } from "./ui/button";

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	const handleChangeThemeClick = () => {
		setTheme(
			theme === "light" ? "dark" : theme === "dark" ? "system" : "light",
		);
	};

	return (
		<Button onClick={handleChangeThemeClick} variant="outline" size="icon">
			{theme === "dark" ? (
				<MoonIcon />
			) : theme === "light" ? (
				<SunIcon />
			) : (
				<MonitorIcon />
			)}
		</Button>
	);
}
