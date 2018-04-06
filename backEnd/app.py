from flask import Flask
from flask import request
from flask import jsonify
import hashlib
import sqlite3
import random
from time import gmtime, strftime

app = Flask(__name__)

@app.route('/')
def homepage():
    return "Hello, Denis. Hello Sasha. Hello Kirill."


@app.route('/reg', methods=['POST'])
def reg():
    with sqlite3.connect("database.db") as c:
        email = request.form.get('email')
        password = request.form.get('pass')
        hash_p = hashlib.md5(password.encode()).hexdigest()

        q1 = "insert into user(email, hash_pass) VALUES('" + email + "', '" + hash_p + "')"
        c.execute(q1)
        c.commit()

        now_date_time = strftime("%Y-%m-%d %H:%M:%S", gmtime())
        token_hash = random.getrandbits(128)
        print(token_hash)
        q2 = "insert into tokens(start_time, duration, hash) VALUES('" + now_date_time + "', 3600 ,'" + str(token_hash) + "')"
        c.execute(q2)
        c.commit()

        q3 = "select id from user where email='" + email + "'"
        cur = c.cursor()
        cur.execute(q3)
        return jsonify({
            'id': cur.fetchone()[0],
            'token': token_hash
        })


@app.route('/auth', methods=['POST'])
def auth():
    with sqlite3.connect("database.db") as c:
        email = request.form.get('email')
        password = request.form.get('pass')
        hash_p = hashlib.md5(password.encode()).hexdigest()
        q3 = "select id from user where email='" + email + "' AND hash_pass='" + hash_p + "'"
        cur = c.cursor()
        cur.execute(q3)

        res = cur.fetchone()
        if not res:
            return "Not found user"
        id = res[0]
        now_date_time = strftime("%Y-%m-%d %H:%M:%S", gmtime())
        token_hash = random.getrandbits(128)
        print(token_hash)
        q2 = "insert into tokens(start_time, duration, hash) VALUES('" + now_date_time + "', 3600 ,'" + str(
            token_hash) + "')"
        c.execute(q2)
        c.commit()
        return jsonify({
            'id': id,
            'token': token_hash
        })



if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
