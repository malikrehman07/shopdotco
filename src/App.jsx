import './App.scss';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Routes from "./pages/Routes"
import { ConfigProvider } from 'antd';
import { useAuthContext } from './context/Auth';
import ScreenLoader from './components/ScreenLoader';
import { SpeedInsights } from '@vercel/speed-insights/react';
function App() {
  const { isAppLoading } = useAuthContext()
  return (
    <>
      {/* <ConfigProvider theme={{token:{colorPrimary:"black",}}}> */}
      <ConfigProvider>
        {isAppLoading
          ? <ScreenLoader />
          : <Routes />
        }
        <SpeedInsights />
      </ConfigProvider>
      {/* </ConfigProvider> */}
    </>
  );
}

export default App;
