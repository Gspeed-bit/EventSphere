const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // this layout was created just to be able to style the login and logout page
    <div className=" flex-center min-h-screen bg-primary-50 bg-cover bg-fixed bg-dotted-pattern w-full bg-center ">
      {children} 
    </div>
  );
};
//
export default Layout;
