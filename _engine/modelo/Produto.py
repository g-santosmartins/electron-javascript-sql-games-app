class Produto:
    def __init__(self,nome,descricao,preco,qtde,categoria,produtora,previewurl):
        self.codigo =0
        self.nome=nome
        self.descricao=descricao
        self.preco = preco
        self.qtde =qtde
        self.categoria=categoria
        self.produtora = produtora
        self.previewurl = previewurl

    def getNome(self):
        return self.nome
    def getDescricao(self):
        return self.descricao
    def getPreco(self):
        return self.preco
    def getQtde(self):
        return self.qtde
    def getCategoria(self):
        return self.categoria
    def getProdutora(self):
        return self.produtora
    def getPreviewurl(self):
        return self.previewurl
    def getCodigo(self):
        return self.codigo
    def setCodigo(self,c):
        self.codigo = c
    def setNome(self,n):
        self.nome = n
    def setDescricao(self,d):
        self.descricao= d
    def setPreco(self,p):
        self.preco = p
    def setQtde(self,q):
        self.qtde = q
    def setCategoria(self,c):
        self.categoria = c
    def setProdutora(self,p):
        self.produtora = p
    def setPreviewurl(self,pu):
        self.previewurl = pu
