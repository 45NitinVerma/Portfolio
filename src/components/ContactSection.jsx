import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
	Mail, MapPin, Phone, Send, Github, Linkedin, Twitter,
	Instagram, CheckCircle, Loader2,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import emailjs from "@emailjs/browser";

const contactInfo = [
	{
		icon: Mail,
		label: "Email",
		value: "45nitinverma@gmail.com",
		href: "mailto:45nitinverma@gmail.com",
		color: "hsl(215 95% 60%)",
	},
	{
		icon: Phone,
		label: "Phone",
		value: "+91 9140261954",
		href: "tel:+919140261954",
		color: "hsl(185 85% 50%)",
	},
	{
		icon: MapPin,
		label: "Location",
		value: "Ghaziabad, UP, India",
		href: null,
		color: "hsl(270 70% 65%)",
	},
];

const socials = [
	{ icon: Github, href: "https://github.com/45NitinVerma", label: "GitHub" },
	{ icon: Linkedin, href: "https://www.linkedin.com/in/45nitinverma", label: "LinkedIn" },
	{ icon: Twitter, href: "https://x.com/45NitinVerma", label: "Twitter/X" },
	{ icon: Instagram, href: "#", label: "Instagram" },
];

const containerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.85, 0.25, 1] } },
};

export const ContactSection = () => {
	const { toast } = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const formRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		emailjs
			.sendForm(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
				formRef.current,
				{ publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
			)
			.then(
				() => {
					setSubmitted(true);
					toast({
						title: "Message sent! 🎉",
						description: "Thank you! I'll get back to you within 24 hours.",
					});
					formRef.current.reset();
					setIsSubmitting(false);
					setTimeout(() => setSubmitted(false), 4000);
				},
				(err) => {
					toast({
						title: "Failed to send",
						description: "Something went wrong. Please try again or email me directly.",
						variant: "destructive",
					});
					console.error("EmailJS:", err);
					setIsSubmitting(false);
				}
			);
	};

	return (
		<section id="contact" className="py-28 px-4 relative overflow-hidden">
			{/* Background accent */}
			<div
				className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10"
				style={{
					background: "radial-gradient(ellipse 80% 60% at 50% 100%, hsl(var(--primary) / 0.15), transparent)",
				}}
			/>

			<div className="container mx-auto max-w-5xl relative z-10">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-20"
				>
					<p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
						Get In Touch
					</p>
					<h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 pb-2 text-foreground">
						Let's <span className="text-gradient">Connect.</span>
					</h2>
					<p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
						Have a project idea, a role to discuss, or just want to say hi? My inbox is always open.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{/* Left — Info */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="space-y-8"
					>
						<motion.div variants={itemVariants} className="space-y-4">
							{contactInfo.map(({ icon: Icon, label, value, href, color }) => (
								<div key={label} className="bg-card border border-border/40 shadow-sm hover:shadow-xl hover:border-primary/20 rounded-2xl p-5 flex items-center gap-4 group transition-all duration-300">
									<div
										className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
										style={{
											background: `${color}15`,
											border: `1px solid ${color}30`,
										}}
									>
										<Icon size={20} color={color} />
									</div>
									<div className="text-left">
										<p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
											{label}
										</p>
										{href ? (
											<a
												href={href}
												className="text-sm font-semibold hover:text-primary transition-colors"
											>
												{value}
											</a>
										) : (
											<p className="text-sm font-semibold">{value}</p>
										)}
									</div>
								</div>
							))}
						</motion.div>

						{/* Social links */}
						<motion.div variants={itemVariants}>
							<p className="text-sm font-semibold mb-4 text-left text-muted-foreground uppercase tracking-wider">
								Find me on
							</p>
							<div className="flex gap-3">
								{socials.map(({ icon: Icon, href, label }) => (
									<a
										key={label}
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={label}
										className="social-icon"
									>
										<Icon size={18} />
									</a>
								))}
							</div>
						</motion.div>

						{/* Availability note */}
						<motion.div
							variants={itemVariants}
							className="bg-card border border-border/40 shadow-sm rounded-2xl p-5 text-left"
						>
							<div className="flex items-center gap-2 mb-2">
								<span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
								<span className="text-sm font-semibold text-green-500">
									Currently Available
								</span>
							</div>
							<p className="text-xs text-muted-foreground leading-relaxed">
								Open to full-time roles, internships, and freelance projects.
								Typically respond within 24 hours.
							</p>
						</motion.div>
					</motion.div>

					{/* Right — Form */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<div className="bg-card border border-border/40 shadow-xl rounded-3xl p-8 lg:p-10">
							<h3 className="text-2xl font-bold mb-6 text-left tracking-tight">
								Send a Message
							</h3>

							<form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
								<div>
									<label
										htmlFor="contact-name"
										className="block text-sm font-medium mb-2 text-left"
									>
										Your Name
									</label>
									<input
										type="text"
										id="contact-name"
										name="name"
										required
										placeholder="John Doe"
										className="form-input"
									/>
								</div>

								<div>
									<label
										htmlFor="contact-email"
										className="block text-sm font-medium mb-2 text-left"
									>
										Email Address
									</label>
									<input
										type="email"
										id="contact-email"
										name="email"
										required
										placeholder="john@example.com"
										className="form-input"
									/>
								</div>

								<div>
									<label
										htmlFor="contact-message"
										className="block text-sm font-medium mb-2 text-left"
									>
										Message
									</label>
									<textarea
										id="contact-message"
										name="message"
										required
										rows={5}
										placeholder="Hi Nitin, I'd love to talk about..."
										className="form-input resize-none"
									/>
								</div>

								<button
									type="submit"
									disabled={isSubmitting || submitted}
									className="cosmic-button w-full gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
								>
									{submitted ? (
										<>
											<CheckCircle size={18} /> Sent Successfully!
										</>
									) : isSubmitting ? (
										<>
											<Loader2 size={18} className="animate-spin" /> Sending...
										</>
									) : (
										<>
											<Send size={18} /> Send Message
										</>
									)}
								</button>
							</form>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};
