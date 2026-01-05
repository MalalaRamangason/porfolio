import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Globe } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-ocean dark:bg-gradient-to-br dark:from-gray-900 dark:to-blue-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-mist"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white dark:text-white mb-4">Let's Connect</h2>
          <p className="text-ocean-light dark:text-blue-200 text-lg max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Links */}
          <div className="space-y-6">
            <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 dark:border dark:border-gray-700 shadow-wave hover:shadow-ocean transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-ocean dark:bg-blue-600 rounded-full flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ocean-deep dark:text-white">LinkedIn</h3>
                    <p className="text-muted-foreground dark:text-gray-300">Connect with me professionally</p>
                    <a 
                      href="https://linkedin.com/in/malala-dev" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-ocean-primary dark:text-blue-400 hover:underline"
                    >
                      linkedin.com/in/malala-ramangason
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 dark:border dark:border-gray-700 shadow-wave hover:shadow-ocean transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-wave dark:bg-blue-500 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ocean-deep dark:text-white">Personal Website</h3>
                    <p className="text-muted-foreground dark:text-gray-300">Explore more of my work</p>
                    <a 
                      href="https://malala-ramangason.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-ocean-primary dark:text-blue-400 hover:underline"
                    >
                      malala-ramangason.vercel.app
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 dark:border dark:border-gray-700 shadow-wave hover:shadow-ocean transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-ocean-primary dark:bg-blue-600 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ocean-deep dark:text-white">Email</h3>
                    <p className="text-muted-foreground dark:text-gray-300">Send me a direct message</p>
                    <a 
                      href="mailto:malala@example.com"
                      className="text-ocean-primary dark:text-blue-400 hover:underline"
                    >
                      hobisoaramangason@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;