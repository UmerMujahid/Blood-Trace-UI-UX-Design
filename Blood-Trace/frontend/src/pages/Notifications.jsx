import { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { d_Notifications } from '../utils/dummy_data';
import NotificationCard from '../components/NotificationCard';

function Notifications() {
    const [notifications, setNotifications] = useState(d_Notifications);
    const [activeTab, setActiveTab] = useState('All');
    
    const unread_n = notifications.filter(n => n.unread).length;

    const filtered_n = useMemo(() => {
        if (activeTab === 'All') 
            return notifications;
        if (activeTab === 'Unread') 
            return notifications.filter(n => n.unread);

        return notifications.filter(n => n.type === activeTab);
        
    }, [notifications, activeTab]);

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    };

    const delete_n = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="w-full flex-col font-sans pb-16 bg-white mt-[-95px] pt-10 min-h-screen">
            <div className="w-full max-w-4xl mx-auto px-4 mt-24 relative">

                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Icon icon="mdi:bell" className="w-8 h-8 text-[#D92D20]" />
                        <div>
                            <h1 className="text-3xl font-bold">Notifications</h1>
                            <p className="text-gray-500 text-sm">{unread_n} unread notification{unread_n !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <button
                        onClick={markAllAsRead}
                        className="border border-gray-300 rounded-full px-6 py-2 text-sm font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Mark All As Read
                    </button>
                </div>

                <div className="bg-[#f2f2f2] rounded-full p-1.5 flex justify-between items-center mb-10 overflow-x-auto">
                    {['All', 'Unread', 'Emergency', 'Requests', 'Info'].map((tab) => {
                        const isActive = activeTab === tab;
                        const label = tab === 'Unread' ? `Unread (${unread_n})` : tab;
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors flex-1 whitespace-nowrap
                                    ${isActive ? 'bg-white shadow-sm text-black' : 'text-gray-600 hover:text-black'}
                                `}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-col gap-6">
                    {filtered_n.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">No notifications found in this category.</div>
                    ) : (
                        filtered_n.map((notif) => (
                            <NotificationCard 
                                key={notif.id}
                                notif={notif}
                                delete_n={delete_n}
                                markAsRead={markAsRead}
                            />
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}

export default Notifications;
