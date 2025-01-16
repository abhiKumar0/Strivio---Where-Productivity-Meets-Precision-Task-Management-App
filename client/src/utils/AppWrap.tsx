

const AppWrap = ({ children }: { children: React.ReactNode }) => {
    return (
        <div  className="w-full max-w-screen-xl mx-auto px-5 md:px-10 lg:px-20">
        
            <main>
                {children}
            </main>
        </div>
    )
}

export default AppWrap