import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            employees: "EMPLOYEES",
            search_for: "SEARCH FOR:",
            first_name: "FIRST NAME",
            last_name: "LAST NAME",
            salary: "SALARY",
            status: "STATUS",
            birthdate: "BIRTHDAY",
            actions: "ACTIONS",
            details: "Details",
            edit: "Edit",
            remove: "Remove",
            add_a_new: "ADD A NEW EMPLOYEE",
            sorted_by: "SORTED BY:",
            sorting_direction: "SORTING DIRECTION:",
            confirmation: "Are you sure you would like to delete this employee:",
            yes: "YES",
            cancellation: "CANCEL",
            employee_result_one: "{{count}} EMPLOYEE",
            employee_result_other: "{{count}} EMPLOYEES",
            search_placeholder: "Type any employee data..."   
        }
    },
    pl: {
        translation: {
            employees: "PRACOWNICY",
            search_for: "SZUKAJ:",
            first_name: "IMIĘ",
            last_name: "NAZWISKO",
            salary: "WYNAGRODZENIE",
            status: "STATUS",
            birthdate: "DATA URODZIN",
            actions: "AKCJE",
            details: "Szczegóły",
            edit: "Edytuj",
            remove: "Usuń",
            add_a_new: "DODAJ NOWEGO PRACOWNIKA",
            sorted_by: "SORTOWANIE WEDŁUG:",
            sorting_direction: "KIERUNEK SORTOWANIA:",
            confirmation: "Czy na pewno chciałabyś/chciałbyś usunąć tego pracownika:",
            yes: "TAK",
            cancellation: "ANULUJ",
            employee_result_one: "{{count}} PRACOWNIK",
            employee_result_other: "{{count}} PRACOWNIKÓW",
            search_placeholder: "Wpisz dowolne dane pracownika..."
        }
    },
    de: {
        translation: {
            employees: "MITARBEITERN",
            search_for: "SUCHEN:",
            first_name: "ERSTE NAME",
            last_name: "FAMILIENNAME",
            salary: "LOHN",
            status: "STATEN",
            birthdate: "GEBURTSTAG",
            actions: "AKTIONEN",
            details: "Datailen",
            edit: "Editen",
            remove: "Entfernen",
            add_a_new: "HINFÜGEN EINE NEUE MITARBEITER ZU",
            sorted_by: "SORTIEREN NACH:",
            sorting_direction: "SORTIERUNG RICHTUNG:",
            confirmation: "Sind Sie sicher Sie mochten dieser Mitarbeiter entfernen:",
            yes: "JA",
            cancellation: "ANULIEREN",
            employee_result_one: "{{count}} MITARBEITER",
            employee_result_other: "{{count}} MITARBEITERN",
            search_placeholder: "Schreiben Sie einen info von einer mitarbeiter..."

        }
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: "pl",
    fallbackLng: "de"
})

export default i18n;