from Produto import Produto
import mysql.connector

class ProdutoDao:
    def __init__(self):
        self.conexao=''
        self.cursor=''
    def conectaDB(self):
        self.conexao = mysql.connector.connect(host='172.17.0.2',database='rentGames',user='root',password='')
        if not self.conexao.is_connected():
            return false
        self.cursor= self.conexao.cursor()
        return True
    def desconectaDB(self):
        self.conexao.close()
    def insert(self,p):
        if not self.conectaDB():
            return False
        sql = ("insert into produto (nome,descricao,preco,qtde,categoria,produtora,previewurl)value(%s,%s,%s,%s,%s,%s,%s)")
        data= (p.getNome(),p.getDescricao(),p.getPreco(),p.getQtde(),p.getCategoria(),
               p.getProdutora(),p.getPreviewurl())
        try:
            self.cursor.execute(sql,data)
            if (self.cursor.rowcount > 0):
                self.conexao.commit()
                self.desconectaDB()
                return True
        except Exception as e:
            print(e)
            self.desconectaDB()
            return  False
    def update(self,p):
        if not self.conectaDB():
            return False
        sql = ("update produto set nome=%s,descricao=%s,preco=%s,qtde=%s," \
              "categoria=%s,produtora=%s,previewurl=%s where codigo = %s")
        data=(p.getNome(),p.getDescricao(),p.getPreco(),p.getQtde(),p.getCategoria(),
               p.getProdutora(),p.getPreviewurl(),p.getCodigo())
        self.cursor.execute(sql,data)
        if (self.cursor.rowcount > 0):
            self.conexao.commit()
            self.desconectaDB()
            return True
        self.desconectaDB()
        return False
    def delete(self,p):
        if not self.conectaDB():
            return False
        sql = 'Delete from produto where codigo ='+str(p.getCodigo())
        self.cursor.execute(sql)
        if(self.cursor.rowcount > 0):
            self.conexao.commit()
            self.desconectaDB()
            return True
        self.desconectaDB()
        return False
    def select(self,c):
        if not self.conectaDB():
            return False
        sql = 'select * from produto where codigo='+str(c)
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        for dado in result:
                P = Produto(dado[1],dado[2],dado[3],dado[4],dado[5],dado[6],dado[7])
                P.setCodigo(dado[0])
                self.desconectaDB()
                return P
        self.desconectaDB()
        return False
