import { useEffect, useState } from 'react';

import { useUserStore } from '../../../stores/user-store';

export const useUserInput = () => {
  const userName = useUserStore(state => state.userName);
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    if (!userName) {
      openNameInput();
    }
  }, [userName]);

  const closeNameInput = () => {
    setShowNameInput(false);
  };

  const openNameInput = () => {
    setShowNameInput(true);
  };

  return {
    showNameInput,
    closeNameInput,
  };
};
