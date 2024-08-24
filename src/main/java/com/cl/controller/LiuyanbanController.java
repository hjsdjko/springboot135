package com.cl.controller;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Map;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import com.cl.utils.ValidatorUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.cl.annotation.IgnoreAuth;

import com.cl.entity.LiuyanbanEntity;
import com.cl.entity.view.LiuyanbanView;

import com.cl.service.LiuyanbanService;
import com.cl.service.TokenService;
import com.cl.utils.PageUtils;
import com.cl.utils.R;
import com.cl.utils.MPUtil;
import com.cl.utils.CommonUtil;
import java.io.IOException;

/**
 * 留言板
 * 后端接口
 * @author 
 * @email 
 * @date 2024-03-19 21:20:19
 */
@RestController
@RequestMapping("/liuyanban")
public class LiuyanbanController {
    @Autowired
    private LiuyanbanService liuyanbanService;



    


    /**
     * 后端列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,LiuyanbanEntity liuyanban,
		HttpServletRequest request){
		String tableName = request.getSession().getAttribute("tableName").toString();
		if(tableName.equals("yonghu")) {
			liuyanban.setYonghuzhanghao((String)request.getSession().getAttribute("username"));
		}
        EntityWrapper<LiuyanbanEntity> ew = new EntityWrapper<LiuyanbanEntity>();

		PageUtils page = liuyanbanService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, liuyanban), params), params));

        return R.ok().put("data", page);
    }
    
    /**
     * 前端列表
     */
	@IgnoreAuth
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params,LiuyanbanEntity liuyanban, 
		HttpServletRequest request){
        EntityWrapper<LiuyanbanEntity> ew = new EntityWrapper<LiuyanbanEntity>();

		PageUtils page = liuyanbanService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, liuyanban), params), params));
        return R.ok().put("data", page);
    }

	/**
     * 列表
     */
    @RequestMapping("/lists")
    public R list( LiuyanbanEntity liuyanban){
       	EntityWrapper<LiuyanbanEntity> ew = new EntityWrapper<LiuyanbanEntity>();
      	ew.allEq(MPUtil.allEQMapPre( liuyanban, "liuyanban")); 
        return R.ok().put("data", liuyanbanService.selectListView(ew));
    }

	 /**
     * 查询
     */
    @RequestMapping("/query")
    public R query(LiuyanbanEntity liuyanban){
        EntityWrapper< LiuyanbanEntity> ew = new EntityWrapper< LiuyanbanEntity>();
 		ew.allEq(MPUtil.allEQMapPre( liuyanban, "liuyanban")); 
		LiuyanbanView liuyanbanView =  liuyanbanService.selectView(ew);
		return R.ok("查询留言板成功").put("data", liuyanbanView);
    }
	
    /**
     * 后端详情
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id){
        LiuyanbanEntity liuyanban = liuyanbanService.selectById(id);
		liuyanban = liuyanbanService.selectView(new EntityWrapper<LiuyanbanEntity>().eq("id", id));
        return R.ok().put("data", liuyanban);
    }

    /**
     * 前端详情
     */
	@IgnoreAuth
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id){
        LiuyanbanEntity liuyanban = liuyanbanService.selectById(id);
		liuyanban = liuyanbanService.selectView(new EntityWrapper<LiuyanbanEntity>().eq("id", id));
        return R.ok().put("data", liuyanban);
    }
    



    /**
     * 后端保存
     */
    @RequestMapping("/save")
    public R save(@RequestBody LiuyanbanEntity liuyanban, HttpServletRequest request){
    	liuyanban.setId(new Date().getTime()+new Double(Math.floor(Math.random()*1000)).longValue());
    	//ValidatorUtils.validateEntity(liuyanban);
        liuyanbanService.insert(liuyanban);
        return R.ok();
    }
    
    /**
     * 前端保存
     */
    @RequestMapping("/add")
    public R add(@RequestBody LiuyanbanEntity liuyanban, HttpServletRequest request){
    	liuyanban.setId(new Date().getTime()+new Double(Math.floor(Math.random()*1000)).longValue());
    	//ValidatorUtils.validateEntity(liuyanban);
        liuyanbanService.insert(liuyanban);
        return R.ok();
    }



    /**
     * 修改
     */
    @RequestMapping("/update")
    @Transactional
    public R update(@RequestBody LiuyanbanEntity liuyanban, HttpServletRequest request){
        //ValidatorUtils.validateEntity(liuyanban);
        liuyanbanService.updateById(liuyanban);//全部更新
        return R.ok();
    }



    

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Long[] ids){
        liuyanbanService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }
    
	








}
