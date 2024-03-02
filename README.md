# Software Studio 2023 Spring Midterm Project

## Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Membership Mechanism                             | 15%       | Y         |
| Firebase page                                    | 5%        | Y         |
| Database read/write                              | 15%       | Y         |
| RWD                                              | 15%       | Y         |
| Chatroom                                         | 20%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Using React                                      | 10%       | Y         |
| Third-Party Sign In                              | 1%        | Y         |
| Chrome Notification                              | 5%        | Y         |
| CSS Animation                                    | 2%        | Y         |
| Deal with problem when sending code                        | 2%        | Y         |

| **Other useful functions**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| User Profile                                  | 1%     | Y |
| Profile Picture                               | 1%     | Y |
| Unsend message                                | 3%     | Y |


---

## How to use 

### LogIn
When first load the webpage, it will be at the login page.
![](https://i.imgur.com/W2J7d9M.jpg)

If you want to go to register page, click the third button, it will redirect to sign-up page.

If you want to sign in with your google account, click the sign in with google button.
> You can sign in with Google using this button no matter you have signed in before or not.

If not using Google to login, you can just type in your registered email and password to login.

### Sign-Up
![](https://i.imgur.com/GMP7LDu.jpg)

To register your new account, you have to type in your email and also your password, username, and profile picture.
After that, press the register account button to register your account.
> After pressing it, you have to wait for a little while in order to process the register process.

If you want to go back to Sign in page, click the go to sign in button.

### ChatRoom
When you logged in successfully, the page will be like this.
![](https://i.imgur.com/cOtx8Gv.jpg)

> It can be divided into three part:
User profile, which is at the up-left part.
Roomlist, which is at the bottom-left.
Room, which is at the right.

Initially, Room part won't display anything. Until you click on any of the room on your roomlist, it will display the room you choosed.

#### User Profile
![](https://i.imgur.com/acmKJ4S.png)

At user profile, it will display your username and your profile picture.

You can click on your image, it will pop up a card showing your username, profile picture, and your intro.
![](https://i.imgur.com/xECN8I7.png)

At right hand side, you can logout by clicking the logout button.

If you want to change your user profile, click the setting dropdown, it will show the options to change.
![](https://i.imgur.com/CKSfQEE.png)

Click the change pic button can let you change your profile picture.
Click the change username button let you change your username.
Click the change user intro button let you change your intro.
> the default intro of a new account is empty.

#### RoomList
![](https://i.imgur.com/GOZgtUp.png)

At roomlist part, it will show your current rooms.
Clcik on one of them will let you open the room at Room part.

The plus button at the top-right allows you to add a new room to your account.

![](https://i.imgur.com/BdMaJvA.png)

After you clicked it, it will pop up a section, where you have to type in the room name and the room's picture.

#### Room
![](https://i.imgur.com/73RD2Fi.png)

At the top, it will show the current room's name and the picture.
There's also a button let you to add new member to this room.

![](https://i.imgur.com/3921ezD.png)

After you click on it, it will pop up a section and you can type in the member's email to add him or her to the room.

At the bottom, you can type in your message.
Both clicking the send button or pressing Enter will send your message.

At the middle, it will show the sent messages.
If the message is sent by you, you can click the little trash can icon on the up-right of message to delete it.
It will pop up a confirm message.

![](https://i.imgur.com/mGOSwxk.png)

After you press confirm the message will be deleted and will be shown like this.

![](https://i.imgur.com/UBROniD.png)

You can also click on the little picture icon on the top-left of the message, it will pop up the user's profile.

![](https://i.imgur.com/lTECuHm.png)

![](https://i.imgur.com/QJ6hFxh.png)


## Function description

### CSS animation
There are two animations, the first one is that the title at the login and sign-up page will change its color throungh time

![](https://i.imgur.com/Ium6uVW.png)
![](https://i.imgur.com/U9k0Mqj.png)

The second one is when hovering on the button in login and sign-up page, the button will change its color too.

![](https://i.imgur.com/JXFR9JJ.png)
![](https://i.imgur.com/C2Rn1VR.png)

### Chrome Notification
I added several notification, for example, when successful sign-up or logged in, it will pop up a notification.

![](https://i.imgur.com/amYGZ5v.png)

Or if you changed your user profile, it will show notification too.
![](https://i.imgur.com/HEiPwln.png)

If you delete a message, it will also show notification.
![](https://i.imgur.com/DjPyrw7.png)

If you add member to room, it will also show notification.
![](https://i.imgur.com/D0tjvkK.png)



### user profile
you can set your user profile at the User Profile part.
And clicking the picture icon will pop up the user's profile as descibed in User Profile and Room part.

### Profile picture
User can choose their own profile picture, and it will display at User Profile part and the message they sent.

### Unsend message
As descibed at Room part, you can unsend your own message by clicking the trash can icon on your message.
![](https://i.imgur.com/4GhBmBR.png)


### Firebase page link
https://midterm-24844.web.app/


<style>
table th{
    width: 100%;
}
</style>