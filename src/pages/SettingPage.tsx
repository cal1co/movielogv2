import './SettingPage.css'
import React, { useState, useContext } from 'react';


import ProfileEditComponent from '../components/ProfileEditComponent'
import PasswordChangeComponent from '../components/PasswordChangeComponent'
import AccountInformationComponent from '../components/AccountInformationComponent'


const SettingPage: React.FC = () => { 

    const [selectedOption, setSelectedOption] = useState<"edit" | "pass" | "acc-info">("edit")
    const [closed, setClosed] = useState<boolean>(false);

    const handleSelectedComponent = () => { 
        switch (selectedOption) {
            case 'edit':
                return <ProfileEditComponent/>
            case 'pass':
                return <PasswordChangeComponent />
            case 'acc-info':
                return <AccountInformationComponent />
            default:
                return
        };
    }
    return (
        <div className="account-settings">
            <div className="settings-options">
            <div className="page-title">
                Settings
            </div>
                <div className="edit-profile setting-page-option" data-testid="edit-profile" onClick={() => setSelectedOption("edit")}>
                    edit profile
                </div>
                <div className="pass-change setting-page-option" onClick={() => setSelectedOption("pass")}>
                    change your password
                </div>
                <div className="account-info setting-page-option" data-testid="edit-account-information" onClick={() => setSelectedOption("acc-info")}>
                    account information 
                </div>
            </div>
            <div className="setting-view">
                {
                    handleSelectedComponent()
                }
            </div>
        </div>
    )
}

export default SettingPage