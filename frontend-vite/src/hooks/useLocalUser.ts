import { useState } from 'react';

const PERSON_ID_KEY = 'pergola_person_id';
const NICKNAME_KEY = 'pergola_nickname';

export function useLocalUser() {
  const [personId, setPersonIdState] = useState<string>(() => {
    let id = localStorage.getItem(PERSON_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(PERSON_ID_KEY, id);
    }
    return id;
  });

  const [nickname, setNicknameState] = useState<string>(
    () => localStorage.getItem(NICKNAME_KEY) ?? ''
  );

  const setNickname = (name: string) => {
    localStorage.setItem(NICKNAME_KEY, name);
    setNicknameState(name);
  };

  const forgetMe = () => {
    localStorage.removeItem(PERSON_ID_KEY);
    localStorage.removeItem(NICKNAME_KEY);
    setNicknameState('');
    // New personId generated on next mount
    const newId = crypto.randomUUID();
    localStorage.setItem(PERSON_ID_KEY, newId);
    setPersonIdState(newId);
  };

  return { personId, nickname, setNickname, forgetMe };
}
