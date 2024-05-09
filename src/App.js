import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import UserContextProvider from './context/userContext';

function App(props) {
  return (
    <UserContextProvider>
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            {props.children}
          </div>
        </div>
        <Footer />
      </div>
    </UserContextProvider>
  );
}
export default App;