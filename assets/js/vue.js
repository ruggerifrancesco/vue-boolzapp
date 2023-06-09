import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  data() {
    return {
      message: 'Hello Vue!',
      activeContactIndex: 0,
      newMessageInput: '',
      searchQuery: '',
      contacts: [
        {
            name: 'Michele',
            avatar: '/img/avatar_1.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di stendere i panni',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Fabio',
            avatar: '/img/avatar_2.jpg',
            visible: true,
            messages: [
                {
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
                }
            ],
        },
        {
            name: 'Samuele',
            avatar: '/img/avatar_3.jpg',
            visible: true,
            messages: [
                {
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Alessandro B.',
            avatar: '/img/avatar_4.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Alessandro L.',
            avatar: '/img/avatar_5.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ricordati di chiamare la nonna',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Va bene, stasera la sento',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Claudia',
            avatar: '/img/avatar_6.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao Claudia, hai novità?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Non ancora',
                    status: 'received'
                },
                {
                    date: '10/01/2020 15:51:00',
                    message: 'Nessuna nuova, buona nuova',
                    status: 'sent'
                }
            ],
        },
        {
            name: 'Federico',
            avatar: '/img/avatar_7.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Fai gli auguri a Martina che è il suo compleanno!',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Grazie per avermelo ricordato, le scrivo subito!',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Davide',
            avatar: '/img/avatar_8.jpg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao, andiamo a mangiare la pizza stasera?',
                    status: 'received'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:51:00',
                    message: 'OK!!',
                    status: 'received'
                }
            ],
        }
      ],   
    }
  },
  methods: {
    selectContactChat(index) {
        this.activeContactIndex = index;
    },
    addNewMessage() {
        if (this.newMessageInput !== '') {
            const activeContact = this.contacts[this.activeContactIndex];
            const newMessage = {
              date: new Date(),
              message: this.newMessageInput,
              status: 'sent'
            };
      
            activeContact.messages.push(newMessage);
            this.newMessageInput = '';
            
            // Console Log Test for new array messages
            // console.log(this.contacts)

            // Delayed automatic response
            setTimeout(() => {
              const autResponseMessage = {
                date: new Date(),
                message: 'Ok',
                status: 'received'
              };
          
              activeContact.messages.push(autResponseMessage);
            }, 1000);
        }
    }, 
    deleteMessage(index) {
        const confirmation = window.confirm("Sei sicuro di voler rimuovere questo messaggio?");
        if (confirmation) {
            this.contacts[this.activeContactIndex].messages.splice(index, 1);
            console.log('Messaggio eliminato!')
        }
    },
    messageinfo(message) {
        return alert(`
            Date: ${message.date}
            Message: ${message.message}
            Status: ${message.status}
        `);
    },
    getLastSentMessage(contact) {
        const messages = contact.messages;
        const lastMessage = messages[messages.length - 1];
        return lastMessage ? lastMessage.message : 'No messages';
    },
    getLastSentMessageDate(contact) {
        const messages = contact.messages;
        const lastMessage = messages[messages.length - 1];
        return lastMessage ? this.formattedTime(lastMessage.date) : '';
    }
  },
  computed: {
    filterContacts() {
        const searchQuery = this.searchQuery.toLowerCase();
        return this.contacts.filter((contact) => {
          const nameContainsLetter = contact.name.toLowerCase().includes(searchQuery);
          return nameContainsLetter;
        });
    },
    formattedTime() {
        return function(date) {
          const options = { hour: 'numeric', minute: 'numeric' };
          return new Date(date).toLocaleTimeString([], options);
        };
    }
  }
}).mount('#app');