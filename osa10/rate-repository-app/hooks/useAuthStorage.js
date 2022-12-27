import { useContext } from 'react';

import AuthStorageContext from '../contexts/AuthStorageContext';

const useAuthStorage = () => useContext(AuthStorageContext);

export default useAuthStorage;
