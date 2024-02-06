import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            employees: "EMPLOYEES",
            search_for: "SEARCH FOR:",
            first_name: "First Name",
            last_name: "Last Name",
            salary: "Salary",
            status: "Status",
            birthdate: "Birthdate",
            details: "Details",
            edit: "Edit",
            remove: "Remove",
            add_a_new: "ADD A NEW EMPLOYEE",
            sorted_by: "SORTED BY:",
            sorting_direction: "SORTING DIRECTION",
            confirmation: "Are you sure you would like to delete this employee?",
            yes: "YES",
            cancellation: "CANCEL",
            employee_result_one: "{{count}} employee.",
            employee_result_other: "{{count}} employees."   
        }
    },
    pl: {
        translation: {
            employees: "PRACOWNICY",
            search_for: "SZUKAJ:",
            first_name: "Imię",
            last_name: "Nazwisko",
            salary: "Płaca",
            status: "Status",
            birthdate: "Data Urodzin",
            details: "Szczegóły",
            edit: "Edytuj",
            remove: "Usuń",
            add_a_new: "DODAJ NOWEGO PRACOWNIKA",
            sorted_by: "SORTOWANIE WEDŁUG:",
            sorting_direction: "KIERUNEK SORTOWANIA",
            confirmation: "Czy na pewno chciałabyś/chciałbyś usunąć tego pracownika?",
            yes: "TAK",
            cancellation: "ANULUJ",
            employee_result_one: "{{count}} pracownika.",
            employee_result_other: "{{count}} pracowników."
        }
    },
    de: {
        translation: {
            employees: "MITARBEITERN",
            search_for: "SUCHEN:",
            first_name: "Erste Name",
            last_name: "FamilienName",
            salary: "Lohn",
            status: "Staten",
            birthdate: "Geburtstag",
            details: "Datailen",
            edit: "Editen",
            remove: "Entfernen",
            add_a_new: "HINFÜGEN EINE NEUE MITARBEITER ZU",
            sorted_by: "SORTIEREN NACH:",
            sorting_direction: "SORTIERUNG RICHTUNG",
            confirmation: "Sind Sie sicher Sie mochten dieser Mitarbeiter entfernen?",
            yes: "JA",
            cancellation: "ANULIEREN",
            employee_result_one: "{{count}} mitarbeiter.",
            employee_result_other: "{{count}} mitarbeitern."

        }
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: "de",
    fallbackLng: "en"
})

export default i18n;