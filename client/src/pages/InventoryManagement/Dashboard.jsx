import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';



import Suppliers from './Suppliers';
import Stock from './Stock';
import Restoke from './Restock';
import DashSidebar from '../../components/InventoryManager.jsx/DashSidebar';


export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="h-screen flex flex-col md:flex-row m-0">
    
      <DashSidebar/>

     
      <div className="flex-1 p-4">
        {tab === 'supplier' && <Suppliers/>}
        {tab === 'stock' && <Stock/>}
        {tab === 'restoke' && <Restoke/>}
      </div>
    </div>
  );
}
