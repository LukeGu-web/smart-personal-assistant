import { FormEvent, useState } from 'react';

type Message = {
  role: string;
  content: string;
};

const api_site = import.meta.env.VITE_API_SITE;

function Dialog() {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const chat = async (event: FormEvent, message: string) => {
    event.preventDefault();

    if (!message) return;
    setIsTyping(true);
    scrollTo(0, 1e10);

    const messages: Message[] = chats;
    messages.push({ role: 'user', content: message });
    setChats(messages);

    setMessage('');

    fetch(`${api_site}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chats,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        messages.push(data.output);
        setChats(messages);
        setIsTyping(false);
        scrollTo(0, 1e10);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>AI Chatbot</h1>

      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className={chat.role === 'user' ? 'user_msg' : ''}>
                <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ''}
      </section>

      <div className={isTyping ? '' : 'hide'}>
        <p>
          <i>{isTyping ? 'Typing' : ''}</i>
        </p>
      </div>

      <form action='' onSubmit={(event) => chat(event, message)}>
        <input
          type='text'
          name='message'
          value={message}
          placeholder='Type a message here and hit Enter...'
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Dialog;
