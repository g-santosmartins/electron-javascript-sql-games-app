import sys
sys.path.insert(1,'./modelo')
from Produto import Produto
from ProdutoDao import ProdutoDao

# catching all the props by sys params
opType       = sys.argv[1]
name         = sys.argv[2]
category     = sys.argv[3]
description  = sys.argv[4]
quantity     = int(sys.argv[5])
producer     = sys.argv[6]
price        = float(sys.argv[7])
image_url    = sys.argv[8]

class ProdutoController:
    def __init__(self):
        self.prod=None
        self.prodDao= ProdutoDao()
    def cadastrar(self,nome,descricao,preco,qtde,categoria,produtora,preview):
        self.prod = Produto(nome,descricao,float(preco),int(qtde),categoria,produtora,preview)
        return self.prodDao.insert(self.prod)
    def consultar(self,codigo):
        self.prod=self.prodDao.select(codigo)
        if self.prod :
            data=(str(self.prod.getCodigo()),self.prod.getNome(),self.prod.getDescricao(),
                      str(self.prod.getPreco()),str(self.prod.getQtde()),self.prod.getProdutora()
                  ,self.prod.getCategoria(),self.prod.getPreviewurl())
            return data
        return False
    def atualizar(self,codigo,nome,descricao,preco,qtde,produtora,categoria,previewurl):
        self.prod = self.prodDao.select(codigo)
        if self.prod:
            if(nome):
                self.prod.setNome(nome)
            if(descricao):
                self.prod.setDescricao(descricao)
            if(preco):
                self.prod.setPreco(float(preco))
            else:
                self.prod.setPreco(float(self.prod.getPreco()))
            if(qtde):
                self.prod.setQtde(int(qtde))
            else:
                self.prod.setQtde(int(self.prod.getQtde()))
            if(produtora):
                self.prod.setProdutora(produtora)
            if(categoria):
                self.prod.setCategoria(categoria)
            if(previewurl):
                self.prod.setPreviewurl(previewurl)
            return self.prodDao.update(self.prod)

        return False
    def excluir(self,codigo):
        self.prod = self.prodDao.select(codigo)
        if self.prod:
            return self.prodDao.delete(self.prod)


controllerInstance = ProdutoController()

if(opType == "1"):
    controllerInstance.cadastrar(name,description,price,quantity,category, producer,image_url)
if(opType == "2"):
    controllerInstance.atualizar(name,description,price,quantity,'ateste','pteste',image_url)
if(opType == "3"):
    controllerInstance.cadastrar(name,'descricaoteste',10.00,2,'ateste','pteste','imgurl')
if(opType == "4"):
    controllerInstance.atualizar(4,'jogotesteAlterado','descricaoteste',10.00,2,'ateste','pteste','imgurl')

# print(teste.consultar(1))
# print(teste.consultar(4))'
# print(teste.consultar(4))
# print(teste.excluir(4))
