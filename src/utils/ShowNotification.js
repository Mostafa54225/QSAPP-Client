import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'


export default function ShowNotification(title, message, type){
  Store.addNotification({
    title,
    message,
    type,
    container: "top-right",
    insert: "top",
    dismiss: {
      duration: 3500,
      onScreen: true
    }
  })
}