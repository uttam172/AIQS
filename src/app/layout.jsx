import "./globals.css"

import Provider from "@/components/Provider"
import Nav from "@/components/Nav"

export const metadata = {
  title: "AIQS",
  description: "Discover & Share AI Prompts",
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    {/* <h1 className="text-red-600 bg-black">sdgbhdb</h1> */}
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout