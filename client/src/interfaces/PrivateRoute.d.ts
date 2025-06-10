declare module './routes/PrivateRoute' {
  import { ReactNode } from 'react';
  const PrivateRoute: ({ children }: { children: ReactNode }) => JSX.Element;
  export default PrivateRoute;
}
