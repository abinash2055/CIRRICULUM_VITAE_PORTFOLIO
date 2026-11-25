
import { Mail, MapPin, CircleDot } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import contactData from "../../data/contact";

const ContactInfo = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const info = contactData.contactInfo;

    const details = [
        {
            icon: Mail,
            label: "Email Address",
            value: info.email,
            href: `mailto:${info.email}`,
        },
        {
            icon: MapPin,
            label: "Location",
            value: info.location,
        },
    ];

    return (
        <div className="space-y-6">

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {details.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className={`flex min-w-0 items-start gap-3 rounded-xl border p-4 ${isDark
                                    ? "border-white/10 bg-white/[0.035]"
                                    : "border-slate-200 bg-slate-50"
                                }`}
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-cyan-400">
                                <Icon size={19} />
                            </div>

                            <div className="min-w-0">
                                <p
                                    className={`mb-1 text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"
                                        }`}
                                >
                                    {item.label}
                                </p>

                                {item.href ? (
                                    <a
                                        href={item.href}
                                        className={`break-all text-xs font-medium transition-colors hover:text-cyan-400 ${isDark ? "text-slate-200" : "text-slate-700"
                                            }`}
                                    >
                                        {item.value}
                                    </a>
                                ) : (
                                    <p
                                        className={`text-xs font-medium ${isDark ? "text-slate-200" : "text-slate-700"
                                            }`}
                                    >
                                        {item.value}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center gap-2">
                <CircleDot
                    size={15}
                    className="animate-pulse text-emerald-400"
                />

                <span
                    className={`text-xs font-medium ${isDark ? "text-slate-300" : "text-slate-600"
                        }`}
                >
                    {info.availability}
                </span>
            </div>

        </div>
    );
};

export default ContactInfo;
