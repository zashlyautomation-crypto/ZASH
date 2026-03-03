import React from 'react';
import { ContactCard } from "../ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export default function Contact() {
    return (
        <section id="contact" className="relative py-16 md:py-32 bg-zash-black">
            <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
                <div className="tag-label mb-8">GET IN TOUCH</div>

                <ContactCard
                    title="COMMUNICATE"
                    description="Our technical support teams and deployment specialists are available for high-priority system integration queries."
                    className="border-zash-chrome/10 bg-zash-matte/50 backdrop-blur-sm"
                    contactInfo={[
                        {
                            icon: MailIcon,
                            label: 'Technical Support',
                            value: 'zashlycraft@gmail.com',
                        },
                        {
                            icon: PhoneIcon,
                            label: 'Direct Line',
                            value: '+92 3294264963',
                        },
                        {
                            icon: MapPinIcon,
                            label: 'HQ / R&D',
                            value: 'Faisalabad, Pakistan',
                            className: 'col-span-1 md:col-span-1 lg:col-span-1',
                        }
                    ]}
                >
                    <form action="#" className="w-full space-y-6">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name" className="text-zash-chrome font-mono-zash text-[10px] tracking-wider uppercase">Identifier / Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                className="bg-zash-dark/50 border-zash-chrome/10 focus:border-silver active:border-silver  transition-colors rounded-none font-space text-zash-light"
                                placeholder="Enter your designation..."
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="text-zash-chrome font-mono-zash text-[10px] tracking-wider uppercase">Communication Channel / Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="bg-zash-dark/50 border-zash-chrome/10 focus:border-zash-silver/30 transition-colors rounded-none font-space text-zash-light"
                                placeholder="name@domain.com"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="message" className="text-zash-chrome font-mono-zash text-[10px] tracking-wider uppercase">Uplink Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                                className="bg-zash-dark/50 border-zash-chrome/10 focus:border-zash-silver/30 transition-colors rounded-none font-space text-zash-light min-h-[120px]"
                                placeholder="Transmission details..."
                            />
                        </div>
                        <Button type="submit" className="w-full bg-zash-silver text-zash-black hover:bg-white transition-all duration-300 rounded-none font-orbitron font-bold tracking-widest uppercase">
                            EXECUTE TRANSMISSION
                        </Button>
                    </form>
                </ContactCard>
            </div>
        </section>
    );
}
