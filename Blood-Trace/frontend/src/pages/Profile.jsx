import { Icon } from '@iconify/react'
import ToggleSwitch from '../components/ToggleSwitch'

function Profile() {
    return (
        <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center py-10 px-4">
            {/* Header */}
            <div className="flex flex-col items-center gap-3 mb-8">
                <div className="w-16 h-16 rounded-full bg-blood-primary flex items-center justify-center shadow-md">
                   <Icon icon="lucide:user" className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-500 text-[0.9rem] mt-1">Manage your donor profile and settings</p>
                </div>
            </div>

            <div className="w-full max-w-[900px] flex gap-6 flex-col md:flex-row">
                {/* Left Column */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-blood-primary">
                            <Icon icon="lucide:user" className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-[0.85rem] font-bold text-gray-900 mb-1.5">Full Name</label>
                                <input type="text" defaultValue="Umar Karamat" className="w-full bg-[#EFEFEF] rounded-lg p-3 text-[0.85rem] text-gray-700 font-medium focus:outline-none" readOnly />
                            </div>
                            <div>
                                <label className="block text-[0.85rem] font-bold text-gray-900 mb-1.5">E-mail Address</label>
                                <input type="email" defaultValue="umer123@gmail.com" className="w-full bg-[#EFEFEF] rounded-lg p-3 text-[0.85rem] text-gray-700 font-medium focus:outline-none" readOnly />
                            </div>
                            <div>
                                <label className="block text-[0.85rem] font-bold text-gray-900 mb-1.5">Phone Number</label>
                                <input type="text" defaultValue="+92 300 1234567" className="w-full bg-[#EFEFEF] rounded-lg p-3 text-[0.85rem] text-gray-700 font-medium focus:outline-none" readOnly />
                            </div>
                        </div>
                    </div>

                    {/* Blood & Location Information */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Icon icon="lucide:droplet" className="w-5 h-5 text-blood-primary" />
                            <h2 className="text-[1.05rem] font-bold text-gray-900">Blood & Location Information</h2>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-[0.85rem] font-medium text-gray-800 mb-2">Blood Type</label>
                            <div className="grid grid-cols-4 gap-3">
                                {['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'].map((type) => (
                                    <div key={type} className={`py-2 rounded-lg flex items-center justify-center font-bold text-[0.9rem] border cursor-pointer ${type === 'AB-' ? 'bg-blood-primary text-white border-blood-primary' : 'bg-[#EFEFEF] text-gray-800 border-transparent hover:bg-gray-200'}`}>
                                        {type}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-[0.85rem] font-medium text-gray-800 mb-1.5">City</label>
                                <input type="text" defaultValue="Lahore" className="w-full bg-[#EFEFEF] rounded-lg p-3 text-[0.85rem] text-gray-700 font-medium focus:outline-none" readOnly />
                            </div>
                            <div>
                                <label className="block text-[0.85rem] font-medium text-gray-800 mb-1.5">Area/Locality</label>
                                <input type="text" defaultValue="Gulberg" className="w-full bg-[#EFEFEF] rounded-lg p-3 text-[0.85rem] text-gray-700 font-medium focus:outline-none" readOnly />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-[0.85rem] font-medium text-gray-800 mb-1.5">Last Donation Date (Optional)</label>
                            <input type="text" defaultValue="11/15/2023" className="w-full bg-[#EFEFEF] rounded-lg p-3 text-[0.85rem] text-gray-700 font-medium focus:outline-none" readOnly />
                        </div>
                    </div>

                    {/* Notification Preferences */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Icon icon="lucide:bell" className="w-5 h-5 text-blood-primary" />
                            <h2 className="text-[1.05rem] font-bold text-gray-900">Notification Preferences</h2>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between bg-[#EFEFEF] rounded-xl p-4 border border-transparent">
                                <div>
                                    <div className="font-bold text-[0.85rem] text-gray-900">Email notifications</div>
                                    <div className="text-[0.75rem] text-gray-500 font-medium">Receive alerts via email</div>
                                </div>
                                <ToggleSwitch isOn={false} setIsOn={() => {}} />
                            </div>
                            <div className="flex items-center justify-between bg-[#EFEFEF] rounded-xl p-4 border border-transparent">
                                <div>
                                    <div className="font-bold text-[0.85rem] text-gray-900">SMS notifications</div>
                                    <div className="text-[0.75rem] text-gray-500 font-medium">Receive alerts via SMS</div>
                                </div>
                                <ToggleSwitch isOn={false} setIsOn={() => {}} />
                            </div>
                            <div className="flex items-center justify-between bg-[#EFEFEF] rounded-xl p-4 border border-transparent">
                                <div>
                                    <div className="font-bold text-[0.85rem] text-gray-900">Push notifications</div>
                                    <div className="text-[0.75rem] text-gray-500 font-medium">Receive in-app alerts</div>
                                </div>
                                <ToggleSwitch isOn={false} setIsOn={() => {}} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Save Changes Button */}
                    <button className="w-full bg-blood-primary hover:bg-red-700 text-white font-medium text-[1.05rem] py-3.5 rounded-xl transition-colors duration-200 mt-2">
                        Save Changes
                    </button>
                    
                </div>

                {/* Right Column */}
                <div className="w-full md:w-[320px] flex flex-col gap-6">
                    {/* Availability Status */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <h3 className="font-bold text-[1rem] text-gray-900 mb-4">Availability Status</h3>
                        <div className="flex items-center justify-between bg-[#EFEFEF] rounded-xl p-3 px-4 mb-4">
                            <span className="text-[0.85rem] text-gray-700 font-medium">Available to donate</span>
                            <ToggleSwitch isOn={false} setIsOn={() => {}} />
                        </div>
                        <div className="w-full py-2.5 bg-[#ccffcc] text-green-600 text-center rounded-xl text-[0.8rem] font-bold">
                            Available
                        </div>
                    </div>

                    {/* Donation Eligibility */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <h3 className="font-bold text-[1rem] text-gray-900 mb-4">Donation Eligibility</h3>
                        <div className="flex items-center justify-between bg-[#EFEFEF] rounded-xl p-3 px-4 mb-4">
                            <span className="text-[0.85rem] text-gray-700 font-medium w-2/3 leading-tight">Days since last<br/>donation</span>
                            <span className="text-[1.05rem] font-bold text-gray-900">109</span>
                        </div>
                        <div className="w-full py-2.5 bg-[#ccffcc] text-green-600 text-center rounded-xl text-[0.8rem] font-bold">
                            Eligible to donate
                        </div>
                    </div>

                    {/* Profile Status */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <h3 className="font-bold text-[1rem] text-gray-900 mb-4">Profile Status</h3>
                        
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between pb-3">
                                <span className="text-[0.85rem] text-gray-700 font-medium">Profile Verified</span>
                                <span className="bg-[#ccffcc] text-green-600 px-3 py-1 rounded-md text-[0.7rem] font-bold">Verified</span>
                            </div>
                            <div className="flex items-center justify-between pb-3">
                                <span className="text-[0.85rem] text-gray-700 font-medium">Total Donations</span>
                                <span className="text-[0.95rem] font-bold text-blood-primary">8</span>
                            </div>
                            <div className="flex items-center justify-between pb-3">
                                <span className="text-[0.85rem] text-gray-700 font-medium">Lives Saved</span>
                                <span className="text-[0.95rem] font-bold text-blood-primary">24</span>
                            </div>
                            <div className="flex items-center justify-between pt-1">
                                <span className="text-[0.85rem] text-gray-700 font-medium">Member Since</span>
                                <span className="text-[0.85rem] font-bold text-gray-900">Jan 2024</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile
