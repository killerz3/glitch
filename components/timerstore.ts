import {create} from 'zustand';

type TimerStore = {
    timerStatus: boolean;
    setTimerStatus: (status: boolean) => void;
};

const useTimerStore = create<TimerStore>((set) => ({
    timerStatus: false,
    setTimerStatus: (status) => set({ timerStatus: status }),
}));

export default useTimerStore;
